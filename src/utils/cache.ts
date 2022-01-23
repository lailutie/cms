class LocalCache {
  setCatch(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  getCatch(key: string) {
    // localStorage的value值要求是一个 string 类型，所以这里需要转换
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  removeCatch(key: string) {
    window.localStorage.removeItem(key)
  }

  clearCatch() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
