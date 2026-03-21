/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    trailingSlash: true, 
   output: 'export', 
  images: {
    unoptimized: true,
    domains: [
      's3-alpha-sig.figma.com',
      'localhost',
      'cdn-icons-png.flaticon.com',
      'api.themoviedb.org',
      'images.pexels.com',
      'www.flaticon.com',
      'img.freepik.com',
      'more-bucket-s3.s3.ap-south-1.amazonaws.com',
      'via.placeholder.com',
      'www.searchenginejournal.com',
      'media.istockphoto.com',
      'cdn.pixabay.com',
      'dummyimage.com',
      'picsum.photos',
      "13.200.107.213",
      "placekitten.com"
    ],
  },
};

export default nextConfig;
