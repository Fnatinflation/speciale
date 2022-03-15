# Documentation

## Devices
Devices that the user owns.

### Philips Hue Bulb
A Philips Hue lightbulb.
<details>
<summary>Details</summary>

#### Input: 
Name | Type | Description|Required
--- | --- | --- |---|
inject|node inputs|Activates the node|Required
#### Outputs:

Name | Type | Description
--- | --- | --- |
deviceId|int|The id of the device
lightState|bool|Turn the light on or off
brightness|int|The brightness value to set the light to.Brightness is a scale from 1 (the minimum the light is capable of) to 254 (the maximum).
hue|uint16|The hue value to set light to. The hue value is a wrapping value between 0 and 65535. Both 0 and 65535 are red, 25500 is green and 46920 is blue.

</details>


### Philips Hue Motion Sensor
A motion sensor for detecting presence.
<details>
<summary>Details</summary>

#### Input: 
Name | Type | Description|Required
--- | --- | --- |---|
inject|node inputs|Activates the node|Required
#### Outputs:
Name | Type | Description
--- | --- | --- |
deviceId|int|The id of the device
presence|bool|Whether the sensor detects motion.

</details>

### myTrigger
Defines a trigger, for specifying which condition that triggers an action.

<details>
<summary>Details</summary>

#### Input:
Name | Type | Description|Required
--- | --- | --- |---|
deviceFields|node inputs|Triggers need both an id of the device to read values from, and the specific field of the device to be read. These can be wired from device nodes|Required

#### Outputs:
Name | Type | Description
--- | --- | --- |
trigger|json|A json object of the trigger. Triggers can be input to the myExport component.

#### Fields:
Field | Type | Description |Required
--- | --- | --- |---|
Name|string|Sets the name of the trigger in the Node-Red editor|Optional
Operator|operator|Sets the operator of the trigger. Can be: <,> or ==|Required
Value|A primitive, based on the input field|sets the value that the input device field should be to pass the condition |Required
</details>

### myAction
Defines an action, for specifying what should happen when a trigger condition is satisfied.

<details>
<summary>Details</summary>

#### Input:
Name | Type | Description|Required
--- | --- | --- |---|
deviceFields|node inputs|Actions need both an id of the device to set values on, and the specific field of the device to be set. These can be wired from device nodes|Required

#### Outputs:
Name | Type | Description
--- | --- | --- |
action|json|A json object of the action. Actions can be input to the myExport component.

#### Fields:
Field | Type | Description |Required
--- | --- | --- |---|
Name|string|Sets the name of the action in the Node-Red editor|Optional
Value|A primitive, based on the input field|The value to set the input device value to.|Required
</details>

### myComment
Comments, that can help explain your implementation to technological novices.
<details>
<summary>Details</summary>

#### Input:
Name | Type | Description|Required
--- | --- | --- |---|
inject|node inputs|Activates the node|Required

#### Outputs:
Name | Type | Description
--- | --- | --- |
comment|json|A json object of the comment. Comments can be input to the myExport component.

#### Fields:
Field | Type | Description |Required
--- | --- | --- |---|
Comment Name|string|Sets the name of the action in the Node-Red editor. Also used as the title for the comment when exported.|Optional
Comment Text|string|Your description of your feature, such that the novice can understand your feature|Required
</details>

### myExport
Gathers triggers, actions and comments to an object, which can be exported using http.
<details>
<summary>Details</summary>

#### Input:
Name | Type | Description|Required
--- | --- | --- |---|
actionCommentTrigger|node inputs|Exports need actions and triggers, in order to define a feature to be exported. These can be wired from trigger, action and comment nodes.|An action and a trigger is required, comments are optional.

#### Outputs:
Name | Type | Description
--- | --- | --- |
feature|json|A json object of a feature. Features can be input to the http component, in order to send the feature to the novice.

#### Fields:
Field | Type | Description |Required
--- | --- | --- |---|
Name|string|Sets the name of the export in the Node-Red editor|Optional
</details>





