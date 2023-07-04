export default function userFilenameFormatter(filename: string, placeholders: Record<string, string>): string {
    // Replace placeholders with corresponding values
    for (const placeholder in placeholders) {
        const regex = new RegExp(`{${placeholder}}`, 'g')
        filename = filename.replace(regex, placeholders[placeholder])
    }

    // Replace spaces with dashes (-)
    filename = filename.replace(/\s+/g, '-')

    // Remove any special characters except dashes, underscores, and dots
    filename = filename.replace(/[^\w-.]/g, '')

    return filename
}