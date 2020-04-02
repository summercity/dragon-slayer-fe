import React, { useEffect } from "react";
import takeRight from "lodash/takeRight";
import { getItem, setItem } from "../../utils/localStorage";

interface Props {}

interface Commentary {
  player: string;
  action: string;
}

const CommentaryActions: React.FC<Props> = props => {
  const j = getItem("commentary");
  const commentary: Commentary[] = j !== null ? JSON.parse(j) : {};
  const comments = takeRight(commentary, 10);

  useEffect(() => {
    const commentary: any = [];
    setItem("commentary", JSON.stringify(commentary));
  }, []);

  return (
    <React.Fragment>
      <div>
        <h2>Commentary Actions</h2>
        <div>
          {comments &&
            comments.map((item, index) => (
              <div key={index}>{`${item.player}: ${item.action}`}</div>
            ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CommentaryActions;
