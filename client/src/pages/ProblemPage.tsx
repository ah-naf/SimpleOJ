import MDEditor from "@uiw/react-md-editor";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Editor from "../components/Editor";
import { asyncSingleProblemGet } from "../store/ProblemSlice";
import { RootState } from "../store/store";

function ProblemPage() {
  const [bottomDrawer, setBottomDrawer] = useState("input");
  const [verdict, setVerdict] = useState("tle");
  const dispatch = useDispatch();
  const problem = useSelector(
    (state: RootState) => state.problem.singleProblem
  );
  const location = useLocation().pathname.split("/")[2];

  useEffect(() => {
    dispatch(asyncSingleProblemGet(location) as any);
  }, []);

  // TODO: Render Problem Details

  return (
    <div className="flex">
      <div className="flex-grow h-screen overflow-y-auto sc1 problemPage p-2 px-4">
        {/* <MDEditor.Markdown
          source={problem?.statement}
        /> */}
        <h1 className="text-3xl py-3 border-b capitalize">{problem?.title}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta
          repellendus, ipsam repellat amet aliquid deleniti odio cum ab esse
          dicta aliquam quod nostrum id enim, eius atque consectetur suscipit
          non pariatur asperiores. Odit fugiat harum aut eligendi pariatur. Quos
          tempora voluptates tempore praesentium ipsa et accusantium dicta
          animi? Porro magnam necessitatibus itaque tempore amet ad tenetur.
          Quis omnis, voluptatibus voluptatum ex quisquam optio quam non. Odit
          officiis facilis repellat distinctio a illo doloribus, beatae nostrum
          molestias, error rerum. Id quos fuga magni esse magnam deserunt dolore
          accusantium voluptas voluptatum nam, possimus temporibus quaerat
          consequatur nostrum eaque perferendis corporis repellat natus eum
          facere rerum dolores iste? Quisquam atque iste culpa maiores ab.
          Dolore sequi incidunt laboriosam rerum blanditiis sint laborum veniam
          voluptatem, corporis assumenda odit eveniet cum explicabo quos autem
          amet tempore. Dolor illum omnis ex impedit inventore voluptate quia.
          Et magnam recusandae sed doloribus dolorem quod totam. Voluptates,
          alias tempora asperiores corporis minus consectetur aliquid laudantium
          possimus error est accusamus deleniti in voluptatem architecto.
          Repellat veniam officiis, dolor et hic vero voluptatem reprehenderit,
          vel praesentium aut optio consequuntur perferendis, velit numquam est
          ex debitis atque unde earum? Labore praesentium dicta quis
          exercitationem nulla ex maxime beatae illo excepturi veniam doloribus
          quod omnis, dolor ab eos distinctio vitae nemo ipsum doloremque
          corrupti obcaecati repellendus itaque. Soluta aliquid similique iusto
          possimus quam deserunt nihil blanditiis unde obcaecati culpa dolorem
          nam vero optio, illum asperiores expedita sequi repellendus nobis.
          Quis qui est aut vel amet laborum aperiam quod repudiandae praesentium
          doloremque. Ipsa reiciendis suscipit accusantium repellendus dolorem
          earum eligendi, impedit doloremque id officiis hic beatae iste
          laboriosam illum quos quia dolore perspiciatis perferendis repudiandae
          aliquam. Velit suscipit repudiandae vero pariatur rem, eius aliquam
          ullam aut voluptas nemo deleniti optio nam, iste natus enim? Deserunt
          dolore ipsum aliquid consequatur adipisci id voluptate fugiat
          temporibus sapiente? Debitis, incidunt! Consequatur magni eligendi
          quas incidunt, vitae officia nulla culpa similique quo pariatur quae
          suscipit aperiam tenetur optio aspernatur aliquid earum accusantium ea
          a necessitatibus quam illum perspiciatis? At aperiam nihil nostrum
          ratione fugiat numquam tempora quae saepe iure voluptatem esse maxime,
          incidunt repellat, est dolore. Quisquam distinctio excepturi atque
          architecto voluptatem cum eos voluptatibus earum aut, ut aliquid
          officia commodi rem aperiam repudiandae quas unde. Nisi quod quidem
          voluptatum excepturi accusantium repudiandae, nesciunt omnis
          provident, impedit corporis dolores alias id error quaerat incidunt
          voluptate officia quasi vitae repellendus ducimus illum dignissimos
          maxime amet molestiae. Blanditiis corrupti obcaecati aliquam ut
          consequatur unde odit suscipit aspernatur hic, placeat magni natus.
          Possimus harum quod corporis tenetur dolores, laborum totam sunt
          corrupti provident autem! Vero similique eveniet provident repellendus
          veritatis quos molestiae quam aperiam ipsam necessitatibus. Laborum,
          omnis soluta tempore molestias itaque at sunt ullam quisquam
          accusantium quia, fugiat reiciendis. Cupiditate, hic blanditiis
          dolores sint repellendus, et amet provident veniam qui nesciunt
          expedita eveniet deserunt magni fugit est. Iste nam temporibus illo
          quos rerum. Possimus ut, provident maiores quas exercitationem totam,
          laudantium recusandae impedit perferendis nesciunt magnam quam,
          doloribus vel expedita beatae id! Doloremque voluptatibus, omnis harum
          molestias beatae ad reprehenderit?
        </p>
      </div>
      <div className="min-w-[45%] border problemPage border-r-0 pr-0 pb-0 p-3 flex flex-col overflow-hidden">
        <div className="">
          <Editor />
        </div>
        <div className="bg-gray-100 text-sm text-gray-700 space-x-4 p-2">
          <button
            className={`${
              bottomDrawer === "input" && "bg-white shadow"
            } p-2 px-4 rounded-md`}
            onClick={() => setBottomDrawer("input")}
          >
            Custom Input
          </button>
          <button
            className={`${
              bottomDrawer === "output" && "bg-white shadow"
            } p-2 px-4 rounded-md`}
            disabled
          >
            Output
          </button>
          <button
            className={`${
              bottomDrawer === "result" && "bg-white shadow"
            } p-2 px-4 rounded-md`}
            onClick={() => setBottomDrawer("result")}
          >
            Code Result
          </button>
        </div>
        <div className="bg-gray-100 flex-grow flex flex-col items-end p-4 pt-2">
          {bottomDrawer !== "result" ? (
            <textarea
              className="bg-white flex-grow w-full border outline-none p-2 text-sm font-bold rounded-sm shadow"
              readOnly={bottomDrawer === "output"}
            ></textarea>
          ) : (
            <div
              className={`bg-white flex-grow w-full border ${
                verdict === "ac"
                  ? "border-green-600"
                  : verdict === "wa"
                  ? "border-red-600"
                  : "border-red-800"
              } outline-none p-2 text-xl grid place-items-center font-bold rounded-sm shadow`}
            >
              {verdict === "ac" && (
                <span className="text-green-600">ACCPETED</span>
              )}
              {verdict === "wa" && (
                <span className="text-red-600">WRONG ANSWER</span>
              )}
              {verdict === "tle" && (
                <span className="text-red-800">TIME LIMIT EXCEEDED</span>
              )}
            </div>
          )}
          <div className="space-x-4 text-sm mt-3">
            <button className="p-2 shadow-md  px-8 border bg-white rounded-lg">
              Run
            </button>
            <button className="p-2 shadow-md font-semibold px-8 border bg-slate-600 text-white rounded-lg">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemPage;
