import React from "react";
import YouTube from "react-youtube";
import ReactMarkdown from "react-markdown";

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
  },
};

function ChapterContent({ chapter, content }) {
  console.log("ChapterContent/", { chapter, content });

  return (
    <div className="p-10">
      <h2 className="text-primary font-medium text-2xl">{chapter?.name}</h2>
      <p className="text-gray-500">{chapter?.about}</p>

      {/* video */}
      <div className="flex justify-center my-6">
        <YouTube videoId={content?.videoId} opts={opts} />
      </div>

      {/* content */}
      <div className="">
        {content?.content?.map((item, idx) => (
          <div className="p-5 bg-sky-50 mb-3 rounded-lg" key={idx}>
            <h2 className="font-medium text-lg">{item?.title}</h2>
            {/* <p className=" whitespace-pre-wrap">{item.description}</p> */}
            <ReactMarkdown>{item.description}</ReactMarkdown>

            {item?.codeExample && (
              <div className="p-4 bg-gray-700 text-white rounded-md mt-3">
                <pre>
                  <code>{item?.codeExample}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterContent;
