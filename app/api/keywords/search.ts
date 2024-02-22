// // api/keywords/search

// import { NextApiRequest, NextApiResponse } from "next";

// interface RequestData {
//   keywords: string[]
// }

// interface ResponseData {
//   message?: string,
//   error?: string
// }
// export async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
//   if (req.method === 'POST') {
//     const data: RequestData = req.body;

//     fetch('http://localhost:8080/api/keyword')
//       .then(response => response.json())
//       .then(data => {
//         // Send the fetched data as a JSON response
//         res.status(200).json(data);
//       })
//       .catch(error => {
//         // Handle errors
//         console.error('Error fetching data:', error);
//         res.status(500).json({ error: 'Failed to fetch data' });
//       });
//   } else {
//     res.status(405).json({error: 'Method Not Allowed'});
//   }
// }

import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ message: 'Hello from Next.js!' })
}