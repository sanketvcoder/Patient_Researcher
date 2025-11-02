import pool from "../db/db.js";
import { addResearcher } from "../model/ResearcherModel.js";

export const createResearcher = async (req, res) => {
    try {
        const newResearcher = await addResearcher(req.body);
        res.status(201).json({
        message: "Researcher created successfully",
        data: newResearcher,
        });
    } catch (error) {
        console.error("Error creating researcher:", error);
        res.status(500).json({
        message: "Failed to create researcher",
        });
    }
};

export const fetchResearcherById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM researcher WHERE id = $1", [
        id,
        ]);
        if (result.rows.length === 0)
        return res.status(404).json({ message: "Researcher not found" });

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching researcher:", error);
        res.status(500).json({ message: "Failed to fetch researcher" });
    }
};

export const updateResearcher = async (req, res) => {
    try {
        const { id } = req.params;
        const {
        name,
        email,
        basic_bio,
        interest,
        city,
        state,
        country,
        address,
        phone_no,
        } = req.body;

        const result = await pool.query(
        `
        UPDATE researcher
        SET name=$1, email=$2, basic_bio=$3, interest=$4, city=$5, state=$6,
            country=$7, address=$8, phone_no=$9
        WHERE id=$10
        RETURNING *;
        `,
        [name, email, basic_bio, interest, city, state, country, address, phone_no, id]
        );

        if (result.rows.length === 0)
        return res.status(404).json({ message: "Researcher not found" });

        res.status(200).json({
        message: "Researcher updated successfully",
        data: result.rows[0],
        });
    } catch (error) {
        console.error("Error updating researcher:", error);
        res.status(500).json({ message: "Failed to update researcher" });
    }
};

export const deleteResearcher = async (req, res) => {
    try {
        const { email, phone_no } = req.body;

        if (!email || !phone_no) {
        return res
            .status(400)
            .json({ message: "Email and phone number are required for deletion" });
        }

        const result = await pool.query(
        "DELETE FROM researcher WHERE email = $1 AND phone_no = $2 RETURNING *",
        [email, phone_no]
        );

        if (result.rows.length === 0) {
        return res.status(404).json({
            message: "No researcher found with given email and phone number",
        });
        }

        res.status(200).json({
        message: "Researcher deleted successfully",
        deleted: result.rows[0],
        });
    } catch (error) {
        console.error("Error deleting researcher:", error);
        res.status(500).json({ message: "Failed to delete researcher" });
    }
};
