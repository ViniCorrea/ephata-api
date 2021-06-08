import { Environment } from 'types/commons';

export function environment(
  nome = process.env.NODE_ENV || 'development',
): Environment {
  if (nome in Object.values(Environment)) {
    throw new Error(
      `"${nome}" não é um environment aceito! O environment deve ter um dos valores: ${Object.values(
        Environment,
      ).join(', ')}`,
    );
  }
  return nome as Environment;
}
