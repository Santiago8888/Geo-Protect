export const countries_pipeline = [{
      '$group': {
        '_id': '$country', 
        'total': { '$sum': 1 }, 
        'sick': { '$sum': '$value' }, 
        'coords': { '$first': '$coords' }
      }
}]
