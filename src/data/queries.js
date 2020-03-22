export const countries_pipeline = [{
	'$group': {
		'_id': '$country', 
		'total': { '$sum': 1 }, 
		'sick': { '$sum': '$value' }, 
		'coords': { '$first': '$coords' }
	}
}]


export const cities_pipeline = [{
	'$group': {
		_id: "$city",
		total: { $sum: 1 },
		sick: { $sum: "$value" },
		coords: { $first: "$coords"}
  	}
}]
