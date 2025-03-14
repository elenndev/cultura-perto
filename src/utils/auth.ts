import bcrypt from 'bcrypt';

// Função para gerar um hash de senha
async function hashPassword(plainPassword: string): Promise<string> {
  const saltRounds = 10; // Número de rounds de salt
  return bcrypt.hash(plainPassword, saltRounds); // Retorna o hash da senha
}

// Função para comparar uma senha com o hash
async function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword); // Retorna true ou false
}

// Exemplo de uso

// async function example() {
//   const password = 'minhaSenhaSuperSegura';
  
//   // Gerando o hash da senha
//   const hashedPassword = await hashPassword(password);
//   console.log(`Senha original: ${password}`);
//   console.log(`Senha hashada: ${hashedPassword}`);
  
//   // Comparando a senha fornecida com o hash armazenado
//   const isPasswordValid = await comparePassword(password, hashedPassword);
//   console.log(`A senha é válida? ${isPasswordValid}`);
// }

// example();
