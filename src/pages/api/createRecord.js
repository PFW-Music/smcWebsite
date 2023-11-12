import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const requestBody = JSON.stringify(req.body);
      const baserowResponse = await axios.post(
        'https://api.baserow.io/api/database/rows/table/212626/?user_field_names=true',
        requestBody, // Forward the body received from the front-end
        {
          headers: {
            'Authorization': `Token HbYQMdxStJRoUvVLyjjegU0s86MIQY9F`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Check if the record was created successfully
      if (baserowResponse.status === 200 || baserowResponse.status === 201) {
        res.status(200).json({ message: 'Record created successfully', data: baserowResponse.data });
      } else {
        res.status(baserowResponse.status).json({
          error: 'Failed to create record',
          details: JSON.stringify(baserowResponse.data)
        });
      }
    } catch (error) {
      console.error('Error in POST request:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        details: error.response ? JSON.stringify(error.response.data) : 'No response data'
      });
    }
  } else {
    // Handle any non-POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
