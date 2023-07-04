interface InstantgramData {
    version: string
    onlineVersion: string
    lastVerification: number
    dateExpiration: number
    settings: [{ name: string; value: any }, ...any[]]
}