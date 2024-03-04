import bcrypt from "bcrypt";
// bycrypt ist eine Hashing-Bibliothek speziell für Passwörter

async function encryptPassword(userPassword) {

    try {
        // Salting ist eine Sichterheitspraxis, die Passwörter in einer Datenbank besser schützt. 
        // Dem Klartext-Password wird vor dem Hashen eine zufällige Zeichenfolge hinzufügt und erhöht damit die Sicherheit.
        const saltRounds = 10
        const generateSalt = await bcrypt.genSalt(saltRounds);
        // Hashen 
        const hashedPassword = await bcrypt.hash(userPassword, generateSalt);
        return hashedPassword;

        
    } catch (error) {
        console.log("Error hashing password", error)
        return null;
    }
} 

async function verifyPassword(password, hashedPassword) {

    const isPassword = await bcrypt.compare(password, hashedPassword)
    // console.log('isPassword', isPassword)

    return isPassword;
}

export { encryptPassword, verifyPassword };

