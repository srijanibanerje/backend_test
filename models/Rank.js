import mongoose from "mongoose";

// Helper function for IST time
function getISTDate() {
    const now = new Date();
    const utcOffset = now.getTime() + 5.5 * 60 * 60 * 1000;
    return new Date(utcOffset);
}

const rankSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        rewards: [
            {
                rankName: { type: String, required: true },
                achievedAt: {
                    type: Date,
                    default: getISTDate   // auto-save date/time
                },
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("Rank", rankSchema);