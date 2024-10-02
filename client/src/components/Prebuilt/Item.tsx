import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import URLError from "../URLError";

export default function PrebuiltItem() {
  const { id } = useParams();
  const [prebuilt, setPrebuilt] = useState();
  const { gpu, cpu, motherboard, ram, storage, psu, cpuCooler } = prebuilt
    ? prebuilt.components
    : {};
  const caseItem = prebuilt ? prebuilt.components.case : {};

  useEffect(() => {
    (async () => {
      const abortController = new AbortController();

      try {
        const res = await fetch(`http://localhost:3000/api/prebuilt/${id}`, {
          signal: abortController.signal,
        });
        if (res.status === 404) setPrebuilt(null);
        else {
          const data = await res.json();
          setPrebuilt(data);
        }
      } catch (error) {
        console.error(error);
      }

      return () => {
        abortController.abort();
      };
    })();
  }, [id]);

  if (prebuilt === null) return <URLError />;
  else if (prebuilt !== undefined)
    return (
      <main className="my-8 grid justify-center">
        <div>
          <div>
            <h1>GPU</h1>
            <img src={gpu.url} alt="GPU" styles="h-16 w-16" />
          </div>
        </div>
      </main>
    );
}
