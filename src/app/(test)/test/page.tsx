"use client";

import BorderBtn from "@/app/components/button/basic/borderBtn";
import Btn from "@/app/components/button/basic/btn";
import RoundBtn from "@/app/components/button/basic/roundBtn";

const TestPage = () => {
  const handleBtnClick = () => {};
  return (
    <div className="flex flex-col gap-10 items-center p-10 bg-dark-bg_secondary">
      <div className="flex gap-3">
        <RoundBtn
          title={"버튼텍스트"}
          onClick={handleBtnClick}
          color={"gray"}
        />
        <RoundBtn
          title={"버튼텍스트"}
          onClick={handleBtnClick}
          color={"pink"}
        />
        <RoundBtn
          title={"버튼텍스트"}
          onClick={handleBtnClick}
          color={"blue"}
        />
        <RoundBtn
          title={"버튼텍스트"}
          onClick={handleBtnClick}
          color={"green"}
        />
        <RoundBtn
          title={"버튼텍스트"}
          onClick={handleBtnClick}
          color={"yellow"}
        />
        <RoundBtn title={"버튼텍스트"} onClick={handleBtnClick} color={"red"} />
      </div>
      <div className="flex gap-3">
        <Btn title={"버튼텍스트"} onClick={handleBtnClick} color={"gray"} />
        <Btn title={"버튼텍스트"} onClick={handleBtnClick} color={"pink"} />
        <Btn title={"버튼텍스트"} onClick={handleBtnClick} color={"blue"} />
        <Btn title={"버튼텍스트"} onClick={handleBtnClick} color={"green"} />
        <Btn title={"버튼텍스트"} onClick={handleBtnClick} color={"yellow"} />
        <Btn title={"버튼텍스트"} onClick={handleBtnClick} color={"red"} />
      </div>
      <div className="flex gap-3">
        <BorderBtn
          title={"버튼텍스트"}
          onClick={handleBtnClick}
          color={"gray"}
        />
        <BorderBtn
          title={"버튼텍스트"}
          onClick={handleBtnClick}
          color={"pink"}
        />
        <BorderBtn
          title={"버튼텍스트"}
          onClick={handleBtnClick}
          color={"blue"}
        />
        <BorderBtn
          title={"버튼텍스트"}
          onClick={handleBtnClick}
          color={"green"}
        />
        <BorderBtn
          title={"버튼텍스트"}
          onClick={handleBtnClick}
          color={"yellow"}
        />
        <BorderBtn
          title={"버튼텍스트"}
          onClick={handleBtnClick}
          color={"red"}
        />
      </div>
    </div>
  );
};

export default TestPage;
