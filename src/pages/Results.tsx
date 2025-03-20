import Button from "../components/Button";
import { ResponsesDisplay } from "../components/ResponsesDisplay";

const Results = () => {
  return (
    <div className="max-h-screen flex justify-center gap-30 pb-40">
      <div className="w-lg text-left flex-column">
        <div className="items-center">
          <div className="bg-emerald-400 w-40 h-1 inline-block m-2 mb-0.5"></div>
          <h3 className="mb-5 inline-block">FORMS</h3>
        </div>
        <h1 className="uppercase font-bold text-7xl font-righteous mb-5 text-pink-600">
          TUS RESPUESTAS
        </h1>
        <p className="my-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque error
          quis et molestiae impedit? Reiciendis, debitis aliquam ratione
          maiores, nam dolorum quasi nulla, temporibus quas nemo architecto
          deleniti saepe consequuntur.
        </p>
      </div>
      <div className="flex flex-col gap-5 w-lg max-h-152 p-6 rounded-3xl bg-stone-50 drop-shadow-xl shadow-purple-950">
        <ResponsesDisplay />
      </div>
    </div>
  );
};

export default Results;
