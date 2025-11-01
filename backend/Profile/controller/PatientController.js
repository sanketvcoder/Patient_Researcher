import { addPatient } from "../model/PatientModel.js"
import pool from '../db/db.js';
export const createPatient = async(req,res)=>{
    try {
        const newPatient = await addPatient(req.body)
        res.status(201).json({
            message:"Patient created successfully",
            data: newPatient,
        })
    } catch (error) {
        console.error("Error creating patient: ",error)
        res.status(500).json({
            message: "Failed to create patient"
        })
    }
}


export const fetchPatientId = async(req,res)=>{
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM patient WHERE id = $1", [id]);
        if (result.rows.length === 0)
        return res.status(404).json({ message: "Patient not found" });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching patient:", error);
        res.status(500).json({ message: "Failed to fetch patient" });
    }
}


export const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const {
        name,
        email,
        basic_bio,
        diseases,
        city,
        state,
        country,
        address,
        phone_no,
        } = req.body;

        const result = await pool.query(
        `
        UPDATE patient
        SET name=$1, email=$2, basic_bio=$3, diseases=$4, city=$5, state=$6,
            country=$7, address=$8, phone_no=$9
        WHERE id=$10
        RETURNING *;
        `,
        [name, email, basic_bio, diseases, city, state, country, address, phone_no, id]
        );

        if (result.rows.length === 0)
        return res.status(404).json({ message: "Patient not found" });

        res.status(200).json({
        message: "Patient updated successfully",
        data: result.rows[0],
        });
    } catch (error) {
        console.error("Error updating patient:", error);
        res.status(500).json({ message: "Failed to update patient" });
    }
};



export const deletePatient = async (req, res) => {
    try {
        const { email, phone_no } = req.body;

        if (!email || !phone_no) {
        return res
            .status(400)
            .json({ message: "Email and phone number are required for deletion" });
        }

        const result = await pool.query(
        "DELETE FROM patient WHERE email = $1 AND phone_no = $2 RETURNING *",
        [email, phone_no]
        );

        if (result.rows.length === 0) {
        return res.status(404).json({
            message: "No patient found with given email and phone number",
        });
        }

        res.status(200).json({
        message: "Patient deleted successfully",
        deleted: result.rows[0],
        });
    } catch (error) {
        console.error("Error deleting patient:", error);
        res.status(500).json({ message: "Failed to delete patient" });
    }
};
