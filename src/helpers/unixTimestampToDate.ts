export default function unixTimestampToDate(unixTimestamp: number): string {
	const date = new Date(unixTimestamp * 1000)
	const isoDate = date.toISOString().slice(0, 10)
	const time = date.toISOString().slice(11, 16).replace(':', '-')
	return `${isoDate}--${time}`
}