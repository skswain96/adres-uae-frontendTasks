import React, { FunctionComponent } from "react";
import Link from "../base//Links";

const Breadcrumbs: FunctionComponent<any> = (props: any) => {
  const breadcrumbs = props.breadcrumbs || [];

  return (
    <div className="inline-flex w-full space-x-3 justify-start items-center">
      {breadcrumbs.map((links: any, index: number) => {
        return (
          <React.Fragment key={links.link + index}>
            <Link label={links.label} path={links.link} />
            {breadcrumbs.length !== index + 1 && <span>{`>`}</span>}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
