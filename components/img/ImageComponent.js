import React from 'react';
import Image from 'next/image';
function ImageCompontent({
  pathImage,
  width = 0,
  height = 0,
  layout = true,
  isContain = false,
}) {
  const myLoader = ({ src }) => {
    return `${src}`;
  };

  const shimmer = (w, h) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#262c4a" offset="20%" />
          <stop stop-color="#e3454b" offset="50%" />
          <stop stop-color="#262c4a" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#262c4a" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`;

  const toBase64 = (str) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);

  return (
    <>
      {layout ? (
        <Image
        className='rounded-lg '
          loader={myLoader}
          src={`${pathImage}`}
          width={width}
          height={height}
          objectFit={isContain ? 'contain' : 'cover'}
          layout={'fill'}
          unoptimized={true}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = '/images/error-404.png';
          }}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(450, 450),
          )}`}
        />
      ) : (
        <Image
        className='rounded-lg  '
          loader={myLoader}
          src={`${pathImage}`}
          objectFit="contain"
          width={width}
          height={height}
          unoptimized={true}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = '/images/error-404.png';
          }}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(450, 450),
          )}`}
        />
      )}
    </>
  );
}

export default React.memo(ImageCompontent);