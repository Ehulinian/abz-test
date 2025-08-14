export interface Position {
	id: number;
	name: string;
}

export interface GetPositionsResponse {
	success: boolean;
	positions: Position[];
}
