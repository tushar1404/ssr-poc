const getPushHeader = (src, srcType) => {
    return `<${src}>; rel=preload; as=${srcType}`
}

export {getPushHeader}