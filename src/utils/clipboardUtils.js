export const copyToClipboard = async (text) => {
	try {
		await navigator.clipboard.writeText(text);
		alert('Copied to clipboard!');
	} catch (error) {
		console.error('Error copying to clipboard:', error);
	}
};
