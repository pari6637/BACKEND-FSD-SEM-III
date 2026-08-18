import fs from "fs/promises";

const fileName = "student.txt";

// 1. CREATE
async function createFile() {
    try {
        await fs.writeFile(
            fileName,
            "Name: Satwik\nCourse: B.Tech CSE",
            "utf8"
        );

        console.log("File created successfully");
    } catch (error) {
        console.log("Error:", error.message);
    }
}
createFile();