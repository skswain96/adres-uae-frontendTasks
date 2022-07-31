import React, { FunctionComponent } from "react";
import Link from "../base//Links";
import Text from "../base/Text";

const Breadcrumbs: FunctionComponent<any> = (props: any) => {
  const breadcrumbs = props.breadcrumbs || [];

  return (
    <div className="inline-flex w-full space-x-3 justify-start items-center">
      {breadcrumbs.map((links: any, index: number) => {
        return (
          <React.Fragment key={links.link + index}>
            <Link
              label={links.label}
              path={links.link}
              color={
                breadcrumbs.length === index + 1
                  ? "text-gray-400"
                  : "text-primary"
              }
            />
            {breadcrumbs.length !== index + 1 && <Text content={`>`} />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
