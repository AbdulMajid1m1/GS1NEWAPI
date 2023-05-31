import { pool1, sql, jwtExpiration, jwtSecret, jwt } from "../utils/common.js";


const MemberController = {
    async getAllMemberData(req, res, next) {
        try {
            const query = `
        SELECT * from [MEM].[Member]
      `;
            const pool = pool1;
            const request = pool.request();
            const data = await request.query(query);

            if (data.recordsets[0].length === 0) {
                return res.status(404).send({ message: "No Record found." });
            }

            return res.status(200).send(data.recordsets[0]);
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message });
        }
    },



    async getMemberByMemberNameE(req, res, next) {
        try {
            const nameToSearch = req.params.name;
            const query = `SELECT * FROM [GS1PRODDB].[MEM].[Member] WHERE MemberNameE LIKE @name`;

            const pool = pool1;
            const request = pool.request();
            request.input('name', sql.NVarChar, `%${nameToSearch}%`);
            const data = await request.query(query);

            if (data.recordset.length === 0) {
                return res.status(404).send({ message: "No Record found." });
            }

            return res.status(200).send(data.recordset);
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message });
        }
    },

    async getMemberByAddress(req, res, next) {
        try {
            const addressToSearch = req.params.address;
            const query = `SELECT * FROM [GS1PRODDB].[MEM].[Member] WHERE Address1 LIKE @address OR Address2 LIKE @address`;

            const pool = pool1;
            const request = pool.request();
            request.input('address', sql.NVarChar, `%${addressToSearch}%`);
            const data = await request.query(query);

            if (data.recordset.length === 0) {
                return res.status(404).send({ message: "No Record found." });
            }

            return res.status(200).send(data.recordset);
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message });
        }
    },

    async getToken(req, res, next) {

        let tokenPayload = {

        };
        const token = jwt.sign(tokenPayload, jwtSecret,
            { expiresIn: jwtExpiration });

        return res.status(200).send(token);

    },

};

export default MemberController;
