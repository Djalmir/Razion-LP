export function strToDate(str) {
	if (!str)
		return new Date()
	return new Date(str.split('/').reverse().join('-') + 'T00:00:00')
}

export function dateToStr(date) {
	if (!date)
		return ''
	return new Date(date).toISOString().split('T')[0].split('-').reverse().join('/')
}

export function getDate(date) {
	return new Date(date).toLocaleDateString()
}

export function getTime(date) {
	return new Date(date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}