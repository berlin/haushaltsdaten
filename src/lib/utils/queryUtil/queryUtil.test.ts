import { mapRawQueryToState } from '.'

describe('mapRawQueryToState', () => {
  test('happy path', () => {
    const testLat = 12.452632
    const testLng = 13.123456
    const testZoom = 10
    const testSearchTerm = 'Kreuzberg'
    const queryState = mapRawQueryToState({
      latitude: `${testLat}`,
      longitude: `${testLng}`,
      zoom: `${testZoom}`,
      searchTerm: testSearchTerm,
    })

    expect(queryState.latitude).toBe(testLat)
    expect(queryState.longitude).toBe(testLng)
    expect(queryState.zoom).toBe(testZoom)
    expect(queryState.searchTerm).toBe(testSearchTerm)
  })

  test('should retrun undefined with invalid numbers', () => {
    const queryState = mapRawQueryToState({
      latitude: 'absc',
      longitude: '[absc,1,null]',
      zoom: 'NaN',
    })

    expect(queryState.latitude).toBe(undefined)
    expect(queryState.longitude).toBe(undefined)
    expect(queryState.zoom).toBe(undefined)
  })
  test('should only accept string search terms', () => {
    expect(
      mapRawQueryToState({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        searchTerm: 123,
      }).searchTerm
    ).toBe(undefined)
  })
})
