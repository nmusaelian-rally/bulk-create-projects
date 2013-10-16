Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

        launch: function() {

            var that = this;
            
            var cb = Ext.create('Ext.Container', {
            
            items: [
                {
                    xtype  : 'rallybutton',
                    text      : 'create',
                    id: 'b2',
                    handler: function() {
                            that._getModel(); 
                    }
                }
                        
                ]
            });
            this.add(cb);

        },
        
        _getModel: function(){
            var that = this;
            Rally.data.ModelFactory.getModel({
                type: 'Project',
                context: {
                    //workspace: '/workspace/1227940010'            //non default workspace
                    workspace: '/workspace/12352608129'         //default workspace
                },
                success: function(model) {
                    //that._createProject(model);
                    var newProjectName = '';
                    var numberOfProjectsToCreate = 180;
                    var count = 0
                   for (count=0; count<numberOfProjectsToCreate; count++){
                        newProjectName = "my project " + count;
                        var project = Ext.create(model, {
                            Name: newProjectName,
                            State: 'Open',
                            //Workspace: '/workspace/1227940010'
                            Workspace: '/workspace/12352608129',
                            Parent: '/project/12527515559'
                        });
                        project.save({
                            callback: function(result, operation) {
                                if(operation.wasSuccessful()) {
                                    console.log(result.get('_refObjectName'),result.get('_ref'));
                                }
                            }
                        });
                    }//...
                    
                }
            });
        }

    
});
