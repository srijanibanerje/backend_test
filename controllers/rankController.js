import Rank from "../models/Rank.js";

export const saveRankAchievement = async (req, res) => {
    try {
        const { userId, name, rankName } = req.body;

        // Basic validation
        if (!userId || !name || !rankName) {
            return res.status(400).json({
                success: false,
                message: "userId, name and rankName are required",
            });
        }

        // Check if document already exists for this user
        let rankDoc = await Rank.findOne({ userId });

        if (!rankDoc) {
            // Create new document
            rankDoc = new Rank({
                userId,
                name,
                rewards: [{ rankName }],
            });
        } else {
            // Push new reward (new rank)
            rankDoc.rewards.push({ rankName });
        }

        await rankDoc.save();

        res.status(201).json({
            success: true,
            message: "Rank achievement saved successfully",
            data: rankDoc,
        });

    } catch (error) {
        console.error("❌ Error saving rank:", error);
        res.status(500).json({
            success: false,
            message: "Failed to save rank achievement",
            error: error.message,
        });
    }
};



// 📌 1. Get ALL Rank Achievements
export const getAllRanks = async (req, res) => {
    try {
        const ranks = await Rank.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: ranks.length,
            data: ranks,
        });
    } catch (error) {
        console.error("Error fetching all ranks:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch ranks",
            error: error.message,
        });
    }
};

// 📌 2. Get Rank Achievements of a Specific User
export const getUserRanks = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId is required",
            });
        }

        const ranks = await Rank.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: ranks.length,
            data: ranks,
        });
    } catch (error) {
        console.error("Error fetching user ranks:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch user ranks",
            error: error.message,
        });
    }
};