import baserow from '../../components/baserow';

export default async (req, res) => {
  try {

    const { fields } = req.body; // Fields to be created

    // Replace 'YOUR_TABLE_ID' with the actual Baserow table ID
    const response = await baserow.api.createRow('212626', {
      field: fields,
    });

    if (response.status === 201) {
      res.status(201).json({ message: 'Record created successfully' });
    } else {
      res.status(500).json({ error: 'Failed to create record' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating record' });
  }
};
