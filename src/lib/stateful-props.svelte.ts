export function useStatefulProps<T>(props: T) {
	let state = $state(props);

	return {
		get value() {
			return state;
		},
		set value(newState) {
			state = newState;
		},
		update(newState: T) {
			//@ts-ignore
			Object.entries(newState).forEach(([key, value]) => {
				//@ts-ignore
				state[key] = value;
			});
		},
	};
}
