import { jsx as _jsx } from "react/jsx-runtime";
import { Autocomplete, TextField } from '@mui/material';
function StaticListVariableOptionEditor(props) {
    const value = props.value.values.map((v)=>{
        if (typeof v === 'string') {
            return v;
        } else {
            return v.value;
        }
    });
    const onChange = (__, value)=>{
        props.onChange({
            values: value.map((v)=>{
                return {
                    value: v,
                    label: v
                };
            })
        });
    };
    return /*#__PURE__*/ _jsx("div", {
        children: /*#__PURE__*/ _jsx(Autocomplete, {
            onPaste: (e)=>{
                // Append new values on paste
                const v = e.clipboardData.getData('text/plain');
                if (v) {
                    const values = v.split(',');
                    onChange(null, value.concat(values));
                    e.preventDefault();
                }
            },
            multiple: true,
            value: value,
            onChange: onChange,
            options: [],
            freeSolo: true,
            clearOnBlur: true,
            readOnly: props.isReadonly,
            renderInput: (params)=>/*#__PURE__*/ _jsx(TextField, {
                    ...params,
                    label: "Values",
                    placeholder: "Values",
                    helperText: 'Type new value then press "Enter" to add.'
                })
        })
    });
}
export const StaticListVariable = {
    getVariableOptions: async (spec)=>{
        const values = spec.values?.map((v)=>{
            if (typeof v === 'string') {
                return {
                    label: v,
                    value: v
                };
            }
            return v;
        });
        return {
            data: values
        };
    },
    dependsOn: ()=>{
        return {
            variables: []
        };
    },
    OptionsEditorComponent: StaticListVariableOptionEditor,
    createInitialOptions: ()=>({
            values: []
        })
};

//# sourceMappingURL=StaticListVariable.js.map