#form validator

set form's novalidate attribute in order to avoid conflict

if validate a form, all input, textarea with a name will be validated

###keywords:

#####required: value cannot be empty

#####pattern: RegExp source to match the value. tel, number, email, url have default pattern, but also can be overrided

#####min, max: compare as string if value - val(min or max) is NaN, otherwise as number

see demo-FORM VALIDATOR
