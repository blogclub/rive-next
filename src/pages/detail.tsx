import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const DetailPage = () => {
  const params = useSearchParams();
  const [type, setType] = useState("");
  const [id, setId] = useState("");
  // console.log(params.get("id"));
};

export default DetailPage;