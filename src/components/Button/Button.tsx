import React from "react";

export const Button = (props: any) => {
	return (
		<button type="button" {...props}>
			{props.children}
		</button>
	);
};
