export const ERROR_MESSAGES = {
  REQUIRED: (field: string) => `${field} wajib diisi`,
  NOTFOUND: (field: string) => `${field} tidak ditemukan`,
  MIN_LENGTH: (field: string, min: number) =>
    `${field} minimal ${min} karakter`,
  MAX_LENGTH: (field: string, max: number) =>
    `${field} minimal ${max} karakter`,
};

export const SUCCESS_MESSAGES = {
  CREATED: (entity: string) => `${entity} berhasil ditambahkan`,
  UPDATED: (entity: string) => `${entity} berhasil diperbarui`,
  DELETED: (entity: string) => `${entity} berhasil dihapus`,
  FETCHED: (entity: string) => `Data ${entity} berhasil diambil`,
};
