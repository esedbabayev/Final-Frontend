import { filterOptions } from "@/config/index.js";

// Components
import { Fragment } from "react/jsx-runtime";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

const Filter = () => {
  return (
    <div className="rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((item) => (
          <Fragment key={item}>
            <div>
              <h3 className="capitalize text-base font-bold">{item}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[item].map((option) => (
                  <Label
                    key={option.label}
                    className="flex items-center gap-2 font-medium"
                  >
                    <Checkbox />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Filter;
