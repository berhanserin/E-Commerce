class response {
    constructor(data = null, errors = null) {
        this.error = errors
        this.data = data
    }
    success(res) {
        return res.status(200).json({ statusCode: 200, data: this.data })
    }
    created(res) {
        return res.status(201).json({ statusCode: 201, data: this.data })
    }
    deleted(res) {
        return res.status(204).json({ statusCode: 204, deleted: true })
    }
    error500(res) {
        return res.status(500).json({
            statusCode: 500,
            errors: this.error,
        })
    }
    notFount(res) {
        return res.status(404).json({
            statusCode: 404,
            errors: this.error,
        })
    }
}

module.exports = response
