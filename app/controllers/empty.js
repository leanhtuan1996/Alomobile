var workflow = new event.EventEmitter();

workflow.on('validate-parameters', () => {

});

workflow.on('handler-error', (err) => {

});

workflow.on('XXX', () => {

});

workflow.emit('validate-paremeters');