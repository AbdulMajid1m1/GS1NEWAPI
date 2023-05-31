import { pool1, sql } from "../utils/common.js";

const ProductController = {
    async getAllProducts(req, res, next) {
        try {
            const query = `SELECT * FROM [GS1PRODDB].[MEM].[Product]`;
            const request = pool1.request();
            const data = await request.query(query);

            if (data.recordset.length === 0) {
                return res.status(404).send({ message: "No products found." });
            }

            return res.status(200).send(data.recordset);
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message });
        }
    },

    async getProductsByMemberId(req, res) {
        try {
            const memberId = req.params.memberId;
            const query = `SELECT * FROM [GS1PRODDB].[MEM].[Product] WHERE MemberID = @memberId`;
            const request = pool1.request();
            request.input('memberId', sql.Int, memberId);
            const data = await request.query(query);

            if (data.recordset.length === 0) {
                return res.status(404).send({ message: "No products found for this member ID." });
            }

            return res.status(200).send(data.recordset);
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message });
        }
    },

    async getProductsByBrandName(req, res) {
        try {
            const brandName = req.params.brandName;
            const query = `SELECT * FROM [GS1PRODDB].[MEM].[Product] WHERE BrandName LIKE @brandName`;
            const request = pool1.request();
            request.input('brandName', sql.NVarChar, `%${brandName}%`);
            const data = await request.query(query);

            if (data.recordset.length === 0) {
                return res.status(404).send({ message: "No products found for this brand." });
            }

            return res.status(200).send(data.recordset);
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message });
        }
    },

    async getProductsByProductsName(req, res) {
        try {
            const productNameE = req.query.productNameE;
            const productNameA = req.query.productNameA;
            const query = `SELECT * FROM [GS1PRODDB].[MEM].[Product] WHERE ProductNameE LIKE @productNameE OR ProductNameA LIKE @productNameA`;
            const request = pool1.request();
            request.input('productNameE', sql.NVarChar, `%${productNameE}%`);
            request.input('productNameA', sql.NVarChar, `%${productNameA}%`);
            const data = await request.query(query);

            if (data.recordset.length === 0) {
                return res.status(404).send({ message: "No products found for these names." });
            }

            return res.status(200).send(data.recordset);
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message });
        }
    },

    async getProductDetailsByBarcode(req, res) {
        try {
            const barcode = req.params.barcode;
            const query = `SELECT * FROM [GS1PRODDB].[MEM].[Product] WHERE BarCode = @barcode`;
            const request = pool1.request();
            request.input('barcode', sql.NVarChar, barcode);
            const data = await request.query(query);

            if (data.recordset.length === 0) {
                return res.status(404).send({ message: "No products found for this barcode." });
            }

            return res.status(200).send(data.recordset[0]); // Assuming barcode is unique and returns only one record
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message });
        }
    },
};

export default ProductController;



