import { AxiosError } from "axios";

export const truncateText = (text: string, length: number) => {
  return text.length > length ? `${text.slice(0, length - 1).trim()}...` : text;
};
export interface APIError {
  message: string;
  details: string;
}
export const parseAPIError = (e: unknown): APIError => {
  if (e instanceof AxiosError) {
    if (e.response) {
      const message = `A requisição retornou o status ${e.response.status}.\n`;
      let details: string;
      if (e.response.data.error && e.response.data.error.details) {
        // Erro de validação
        details = `${JSON.stringify(e.response.data.error.details, null, " ")}`;
      } else {
        details = `${JSON.stringify(e.response.data, null, " ")}`;
      }
      return { message, details };
    } else if (e.request) {
      return {
        message: `O servidor não respondeu a requisição.`,
        details: `${e.message}"\nErro Completo:\n${JSON.stringify(e, null, " ")}`,
      };
    } else {
      return {
        message: `Houve um erro ao fazer a requisição.`,
        details: `${e.message}"\nErro Completo:\n${JSON.stringify(e, null, " ")}`,
      };
    }
  } else {
    return {
      message: `Houve um erro inesperado.`,
      details: `${JSON.stringify(e, null, " ")}`,
    };
  }
};
