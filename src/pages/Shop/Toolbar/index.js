import InputWrapper from "components/InputWrapper";
import BUTTON_VARIANTS from "constants/button-variants";
import React from "react";
import mapWithOptions from "utils/mapWithOptions";
import { useGlobalDispatcher, useGlobalStore, GLOBAL_STORE_ACTIONS } from 'contexts/GlobalStore';

function Toolbar() {
  //custom hooks
  const globalDispatcher = useGlobalDispatcher();

  const {
      buttonVariant
  } = useGlobalStore();

    const BUTTON_VARIANT_OPTIONS = Object.keys(BUTTON_VARIANTS).map(value => {
        const code = BUTTON_VARIANTS[value];
        return ({
            label: code,
            type: 'radio',
            get labelCustomStyles() {
                return ({ color: code })
            },
            get id() { return `button-vairant-${code}` },
            checked: buttonVariant === code,
            name: 'button-vairant',
            value: code,
            onChange: () => {if(!(buttonVariant === code)) globalDispatcher({
                type: GLOBAL_STORE_ACTIONS.SET_BUTTON_VARIANT,
                payload: code
            })},
        })
    }
    );
    return <div className="w-100 d-flex justify-content-end">
        <div className="d-flex">
            {mapWithOptions(BUTTON_VARIANT_OPTIONS, (options) => <React.Fragment key={options.id}>
                <InputWrapper {...options} />
            </React.Fragment>)}
        </div>
    </div>
}

export default Toolbar;