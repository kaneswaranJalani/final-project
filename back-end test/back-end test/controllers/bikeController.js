// import SelectedBike from "../models/bike.js";

// // POST /api/bikes/select
// export const saveSelectedBike = async (req, res) => {
//   try {
//     const { name, price, color } = req.body;

//     if (!name || !price || !color) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const newBike = new SelectedBike({
//       name,
//       price,
//       color
//     });

//     await newBike.save();
//     res.status(201).json({ message: "Bike selection saved successfully", data: newBike });
//   } catch (error) {
//     console.error("Error saving bike:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
