import { execSync } from "child_process";

try {
    execSync(`git push`, { stdio: "inherit" });
    console.log(`Git push : Ok`);
} catch (err) {
    console.error("Erreur lors de Git push :", err.message);
}

try {
    execSync(`git push --tags`, { stdio: "inherit" });
    console.log(`Git push --tags : Ok`);
} catch (err) {
    console.error("Erreur lors de Git push --tags :", err.message);
}