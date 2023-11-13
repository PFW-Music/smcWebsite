export default async function handler(req, res) {
    const BaserowUrl = "https://api.baserow.io/api/database/rows/table/212629/";

    try {
        const response = await fetch(`${BaserowUrl}?user_field_names=true`, {
            method: 'GET',
            headers: {
                'Authorization': `Token HbYQMdxStJRoUvVLyjjegU0s86MIQY9F`
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: error.message });
    }
}
