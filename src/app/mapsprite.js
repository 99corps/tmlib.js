/*
 * mapsprite.js
 */

tm.app = tm.app || {};

(function() {
    tm.app.MapSheetManager = {
        maps: {},
    };

    tm.app.MapSheetManager.load = function(key, path) {
        this.maps[key] = tm.app.MapSheet(path);
    };

    tm.app.MapSheetManager.get = function(key) {
        return this.maps[key];
    };

    tm.define("tm.app.MapSheet", {
        init: function(path) {
            this.loaded = false;

            if (typeof path == "string") {
                tm.util.Ajax.load({
                    url: path,
                    success: function(e) {
                        var d = this._parse(e);
                        this.$extend(d);
                    }.bind(this),
                });
            }
            else {
                this.$extend(arguments[0]);
            }

        },

        _parse: function(str) {
            var data = {};
            var parser = new DOMParser();
            var xml = parser.parseFromString(str, 'text/xml');
            var map = this._attrToJSON(xml.getElementsByTagName('map')[0]);

            data.width = map.width;
            data.height= map.height;
            data.tilewidth = map.tilewidth;
            data.tileheight= map.tileheight;

            // tilesets(image)
            data.tilesets = [];
            // var tilesets =  xml.getElementsByTagName('tileset');
            var imgSrc = xml.getElementsByTagName('image')[0].getAttribute('source');
            tm.graphics.TextureManager.add(imgSrc);
            data.tilesets[0] = {
                image: imgSrc
            };

            // layer
            data.layers = [];
            this.layers = [];

            var layers = xml.getElementsByTagName('layer');
            for (var i=0,len=layers.length; i<len; ++i) {
                var d = layers[i].getElementsByTagName('data')[0];
                var encoding = d.getAttribute("encoding");
                var layer = {};

                if (encoding == "csv") {
                    layer.data = this._parseCSV(d.textContent);
                }
                else if (encoding == "base64") {
                    layer.data = this._parseBase64(d.textContent);
                }

                data.layers.push(layer);

            }

            var objects = xml.getElementsByTagName('object');

            console.dir(data);

            return data;
        },

        _parseCSV: function(data) {
            var dataList = data.split(',');
            var layer = [];

            dataList.each(function(elm, i) {
                var num = parseInt(elm, 10) - 1;
                layer.push(num);
            });

            return layer;
        },

        /**
         * http://thekannon-server.appspot.com/herpity-derpity.appspot.com/pastebin.com/75Kks0WH
         */
        _parseBase64: function(data) {
            var dataList = atob(data.trim());
            var rst = [];

            dataList = dataList.split('').map(function(e) {
                return e.charCodeAt(0);
            });

            for (var i=0; i<100; ++i) {
                var n = dataList[i*4];
                rst[i] = parseInt(n, 10) - 1;
            }
            
            return rst;
        },

        _attrToJSON: function(source) {
            var obj = {};
            for (var i = 0; i < source.attributes.length; i++) {
                if (source.attributes[i].name !== 'name') {
                    //attributeのvalueが数値にパースできたら数値を、
                    //出来なかったらそのまま突っ込む
                    var val = source.attributes[i].value;
                    val = isNaN(parseFloat(val))? val: parseFloat(val);
                    obj[source.attributes[i].name] = val;
                }
            }

            var properties = source.getElementsByTagName('property');
            for (var k = 0;k < properties.length;k++) {
                obj[properties[k].getAttribute('name')] = properties[k].getAttribute('value');
            }

            return obj;
        },
    });



})();

(function() {

    tm.define("tm.app.MapSprite", {
        superClass: "tm.app.Shape",

        init: function(chipWidth, chipHeight, mapSheet) {
            this.superInit();

            if (typeof mapSheet == "string") {
                this.mapSheet = tm.app.MapSheetManager.get(mapSheet);
            }
            else {
                this.mapSheet = mapSheet;
            }

            this.chipWidth  = chipWidth;
            this.chipHeight = chipHeight;

            this.originX = this.originY = 0;

            this.width = chipWidth*this.mapSheet.width;
            this.height= chipWidth*this.mapSheet.height;
            this.canvas.resize(this.width, this.height);

            this.render();
        },

        render: function() {
            var self = this;
            var mapSheet = this.mapSheet;

            var texture = tm.graphics.TextureManager.get(mapSheet.tilesets[0].image);
            var xIndexMax = (texture.width/mapSheet.tilewidth)|0;

            this.mapSheet.layers.each(function(layer, hoge) {
                layer.data.each(function(d, index) {
                    var type = d;
                    if (type == -1) {
                        return ;
                    }
                    type = Math.abs(type);

                    var xIndex = index%mapSheet.width;
                    var yIndex = (index/mapSheet.width)|0;

                    var mx = (type%xIndexMax);
                    var my = (type/xIndexMax)|0;

                    var dx = xIndex*self.chipWidth;
                    var dy = yIndex*self.chipHeight;


                    self.canvas.drawTexture(texture,
                        mx*mapSheet.tilewidth, my*mapSheet.tileheight, mapSheet.tilewidth, mapSheet.tileheight,
                        dx, dy, self.chipWidth, self.chipHeight
                        );

                    /*
                    line.each(function(type, xIndex) {
                        if (type == -1) {
                            return ;
                        }
                        type = Math.abs(type);

                        var mx = (type%mapSheet.map.xIndexMax);
                        var my = (type/mapSheet.map.xIndexMax)|0;

                        var dx = xIndex*self.chipWidth;
                        var dy = yIndex*self.chipHeight;

                        self.canvas.drawImage(mapSheet.image,
                            mx*mapSheet.map.tilewidth, my*mapSheet.map.tileheight, mapSheet.map.tilewidth, mapSheet.map.tileheight,
                            dx, dy, self.chipWidth, self.chipHeight
                            );
                    });
*/
                });
            });
        },

    });

})();



