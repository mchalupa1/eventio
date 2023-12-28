"use client";

type DetailsProps = {
  params: {
    id: string;
  };
};

const Details: React.FC<DetailsProps> = ({ params }) => {
  return (
    <>
      <h1>{params.id}</h1>
    </>
  );
};

export default Details;
