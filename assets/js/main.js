Vue.component('beranda',{
    template: 
    '<div class="row">' +
        '<div class="col-md-4">' +
            '<div class="pln-card">' +
                'asdas'+                
            '</div>' +    
        '</div>' +
    '</div>'
})

Vue.component('pelanggan',{
    data(){
        return {
            pelanggan: [],
            alert: {
                show: false,
                title: '',
                cancel: false,
                body: '',
                ok: true,
                okclose: true,
                okclick: function(){}
            }
        }
    },
    methods: {
        addPelanggan(){
            let comp = this
            comp.alert.cancel   =  true
            comp.alert.title    = 'Tambah data pelanggan'
            comp.alert.body     = 
                'Silahkan pilih file yang akan anda tambahkan ke database!' + 
                '<br><br>' +
                '<div class="btn-group btn-block">' +
                    '<button class="btn btn-success" id="prabayar">Pra bayar</button>'+
                    '<button class="btn btn-outline-success"  id="paskabayar">Pasca bayar</button>'+
                '</div>'
            comp.alert.okclick  = function(){setTimeout(function(){comp.loading = false;},500)}
            comp.alert.show     = true;
            comp.initJquery()
        }, 
        initJquery(){
            let comp = this
            $('#prabayar').click(function(){console.log('oke')});
        }
    },
    mounted(){
        let comp = this
        $.get({
            url: 'api/',
            data: {path:'pelanggan'},
            success(v){
                v = JSON.parse(v)
                if(v.status){
                    comp.pelanggan = v.data
                }
            }
        })
    },
    template:
    '<div class="container">' +
        '<h4 class="mb-4"> Pelanggan </h4>' +
        '<div class="row">' +
            '<div class="col-md-12">' +
                '<div class="pln-card">' +
                    '<div class="pln-card-header align-items-center d-flex">' +
                        'Daftar Pelanggan'+
                        '<div class="btn-group ml-auto">'+
                            '<button class="btn btn-primary" @click="addPelanggan"><i data-feather="plus" class="p-1"></i></button>'+
                            '<button class="btn btn-outline-primary"><i data-feather="edit" class="p-1"></i></button>'+
                        '</div>'+
                    '</div>' +    
                    '<table class="table table-bordered" v-if="pelanggan.length > 0">'+
                        '<thead>'+ 
                            '<th>ID Pelanggan</th>'+
                            '<th>Nama</th>'+
                            '<th>Alamat</th>'+
                            '<th>Tarif</th>'+
                            '<th>Daya</th>'+
                            '<th>RBM</th>'+
                            '<th>Jenis Pelanggan</th>'+
                            '<th>Status</th>'+
                        '</thead>'+
                        '<tbody>'+
                            '<tr v-for="v in pelanggan">'+
                                '<td>ID Pelanggan</td>'+
                                '<td>Nama</td>'+
                                '<td>Alamat</td>'+
                                '<td>Tarif</td>'+
                                '<td>Daya</td>'+
                                '<td>RBM</td>'+
                                '<th>Jenis Pelanggan</th>'+
                                '<td>Status</td>'+
                            '</tr>'+
                        '</tbody>'+
                    '</table>'+
                    '<span v-else>Data pelanggan tidak tersedia</span>'+
                '</div>' +    
            '</div>' +
        '</div>' +
        '<alert v-if="alert.show" :cancel="alert.cancel" @close="alert.show = false" :okclick="alert.okclick" :title="alert.title" :body="alert.body" :ok="alert.ok" :okclose="alert.okclose"></alert>'+
    '</div>'
})
Vue.component('beritaAcara',{
    data() {
        return {
            beritaAcara: []
        }
    },
    template: 
    '<div class="container">' +
        '<h4 class="mb-4"> Berita Acara </h4>' +
        '<div class="row">' +
            '<div class="col-md-12">' +
                '<div class="pln-card">' +
                    '<div class="pln-card-header">' +
                        'Daftar Berita Acara'+
                    '</div>' +    
                    '<table class="table table-bordered">'+
                        '<tr>'+
                            '<td>'+
                                '2'+
                            '</td>'+
                        '</tr>'+
                    '</table>'+
                '</div>' +    
            '</div>' +
        '</div>' +
    '</div>'
})
Vue.component('home',{
    data(){
        return {
            menu: 'pelanggan',
            alert: {
                show: false,
                title: '',
                body: '',
                ok: true,
                okclose: true,
                okclick: function(){}
            }
        }
    },
    template: 
    '<div id="home" class="d-flex vw-100 vh-100">'+
        '<div class="sidebar">'+
            '<h5 class="text-center text-light p-5">PLN PKL</h5>'+
            '<nav class="nav flex-column pl-3">' + 
                '<a class="nav-link" :class="menu == \'beranda\' ? \'active\': \'\'" @click="menu = \'beranda\'">Beranda</a>' + 
                '<a class="nav-link" :class="menu == \'pelanggan\' ? \'active\': \'\'" @click="menu = \'pelanggan\'">Pelanggan</a>' + 
                '<a class="nav-link" :class="menu == \'beritaAcara\' ? \'active\': \'\'" @click="menu = \'beritaAcara\'">Berita Acara</a>' + 
            '</nav>' + 
        '</div>' +
        '<div class="main w-100 p-4">' +
            '<transition name="fade" mode="out-in">' +
                '<beranda v-if="menu == \'beranda\'"></beranda>'+
                '<pelanggan v-else-if="menu == \'pelanggan\'"></pelanggan>'+
                '<beritaAcara v-else></beritaAcara>' +
            '</transition>'+
        '</div>' +
        '<alert v-if="alert.show" @close="alert.show = false" :okclick="alert.okclick" :title="alert.title" :body="alert.body" :ok="alert.ok" :okclose="alert.okclose"></alert>'+
    '</div>'
})

Vue.component('login',{
    data(){
        return {
            id: '',
            password: '',
            change: {
                id: false,
                password: false
            },
            valid: {
                id : true,
                password : true
            },
            loading: false,
            alert: {
                show: false,
                title: '',
                body: '',
                okclick: function(){}
            }
        }
    },
    methods: {
        login(){
            let comp = this
            comp.loading = true
            $.post({
                url: 'api/',
                data: {path: 'auth', id: comp.id, password: comp.password},
                success(v){
                    v = JSON.parse(v)
                    if(!v.status){
                        comp.alert.title    = 'Gagal'
                        comp.alert.body     = v.message
                        comp.alert.okclick  = function(){setTimeout(function(){comp.loading = false;},500)}
                        comp.alert.show     = true;
                    } else {
                        setTimeout(function(){comp.loading = false; comp.$emit('page','home')},500)
                    }
                }
            })
        }
    },
    watch: {
        id: function(newVal, oldVal){
            let valid = '0123456789'
            let check = true
            for(let i = 0; i < newVal.length; i++){
                check = valid.indexOf(newVal.charAt(i)) != -1 && check
            }
            if(!check || newVal.length>6){
                this.id = oldVal
            }
            this.valid.id = this.id.length == 6
            this.change.id = true
        },
        password: function(newVal){
            this.valid.password = this.password.length >= 6
            this.change.password = true
        },
    },
    template: 
        '<div id="login" class="align-items-center d-flex justify-content-center vh-100">'+
            '<div class="container row">'+    
                '<div class="col-md-4 m-auto">'+
                    '<div class="pln-card shadow animated bounceIn">'+
                        '<div class="pln-card-header">Masuk</div>'+
                        '<div class="pln-card-body">'+
                            '<div class="form-group">'+
                                '<label for="id">ID Pengguna <i data-feather="alert-circle" class="text-warning p-1 d-none d-sm-inline" data-toggle="popover" data-trigger="hover" data-content="Terdiri dari 6 angka."></i></label>'+
                                '<input v-model="id" class="form-control" type="text" :class="change.id ? (valid.id? \'is-valid\' : \'is-invalid\') : \'\'" aria-describedby="IDHelp" placeholder="ID Pengguna" :readonly="loading">'+
                                '<small class="form-text text-muted d-block d-sm-none">Terdiri dari 6 angka.</small>' +
                            '</div>'+
                            '<div class="form-group">'+
                                '<label for="id">Kata Sandi <i data-feather="alert-circle" class="text-warning p-1 d-none d-sm-inline" data-toggle="popover" data-trigger="hover" data-content="Terdiri dari minimal 6 karakter."></i></label>'+
                                '<input v-model="password" class="form-control" type="password" :class="change.password ? (valid.password? \'is-valid\' : \'is-invalid\') : \'\'" aria-describedby="PasswordHelp" placeholder="Kata Sandi" :readonly="loading">'+
                                '<small class="form-text text-muted d-block d-sm-none">Terdiri dari minimal 6 karakter.</small>' +
                            '</div>'+
                            '<div class="row">' +
                                '<div class="col-6 col-sm-6 col-lg-5 ml-auto">' +
                                    '<button type="button" @click="login" class="btn btn-primary btn-block" aria-disabled="true" :disabled="(valid.id && valid.password && change.id && change.password && !loading)? false : true" >'+
                                        '<div v-if="loading" class="spinner-border text-light" style="height: 1rem;width: 1rem;border-width: 0.1rem;"><span class="sr-only">Loading...</span></div>' +
                                        '<span v-else>Ya, lanjut!</span>' +
                                    '</button>' +
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<alert v-if="alert.show" @close="alert.show = false" :okclick="alert.okclick" :title="alert.title" :body="alert.body" ok="true" okclose="true"></alert>'+
        '</div>'
})
Vue.component('newapp', {
    data(){
        return {
            id: '',
            password: '',
            change: {
                id: false,
                password: false
            },
            valid: {
                id : true,
                password : true
            },
            loading: false,
            alert: {
                show: false,
                title: '',
                body: '',
                okclick: function(){}
            }
        }
    },
    watch: {
        id: function(newVal, oldVal){
            let valid = '0123456789'
            let check = true
            for(let i = 0; i < newVal.length; i++){
                check = valid.indexOf(newVal.charAt(i)) != -1 && check
            }
            if(!check || newVal.length>6){
                this.id = oldVal
            }
            this.valid.id = this.id.length == 6
            this.change.id = true
        },
        password: function(newVal){
            this.valid.password = this.password.length >= 6
            this.change.password = true
        },
    },
    methods: {
        saveAdmin(){
            let comp = this
            comp.loading = true
            $.post({
                url: 'api/', 
                data: {path : 'admin/create', id: comp.id, password: comp.password},
                success(val){
                    val = JSON.parse(val);
                    setTimeout(function(){
                        
                        if(val.status){
                            $('#confirmModal').modal('hide')
                            setTimeout(function(){
                                comp.alert.title    = 'Berhasil'
                                comp.alert.body     = 'Admin telah ditambahkan, silahkan masuk untuk melanjutkan'
                                comp.alert.okclick = function(){comp.$emit('page','login')}
                                comp.alert.show     = true;
                            }, 300)
                        }
                    }, 1000)
                }
            })
        }
    },
    template: 
        '<div id="newapp" class="align-items-center d-flex justify-content-center vh-100">'+
            '<div class="container row">'+    
                '<div class="col-md-6 col-lg-4 m-auto">'+
                    '<div class="pln-card shadow animated bounceIn">'+
                        '<div class="pln-card-header">Pengaturan awal</div>'+
                        '<div class="pln-card-body">'+
                            '<p class="text-secondary">Silahkan buat <b>ID Pengguna</b> dan <b>Kata Sandi</b> untuk melanjutkan proses penginstalan aplikasi ini.</p>'+
                            '<div class="form-group">'+
                                '<label for="id">ID Pengguna <i data-feather="alert-circle" class="text-warning p-1 d-none d-sm-inline" data-toggle="popover" data-trigger="hover" data-content="Terdiri dari 6 angka."></i></label>'+
                                '<input v-model="id" class="form-control" type="text" :class="change.id ? (valid.id? \'is-valid\' : \'is-invalid\') : \'\'" aria-describedby="IDHelp" placeholder="ID Pengguna">'+
                                '<small class="form-text text-muted d-block d-sm-none">Terdiri dari 6 angka.</small>' +
                            '</div>'+
                            '<div class="form-group">'+
                                '<label for="id">Kata Sandi <i data-feather="alert-circle" class="text-warning p-1 d-none d-sm-inline" data-toggle="popover" data-trigger="hover" data-content="Terdiri dari minimal 6 karakter."></i></label>'+
                                '<input v-model="password" class="form-control" type="text" :class="change.password ? (valid.password? \'is-valid\' : \'is-invalid\') : \'\'" aria-describedby="PasswordHelp" placeholder="Kata Sandi">'+
                                '<small class="form-text text-muted d-block d-sm-none">Terdiri dari minimal 6 karakter.</small>' +
                            '</div>'+
                            '<div class="row">' +
                                '<div class="col-6 col-sm-5 col-md-4  ml-auto">' +
                                    '<button type="button" class="btn btn-primary btn-block" aria-disabled="true" :disabled="(valid.id && valid.password && change.id && change.password)? false : true" data-toggle="modal" data-target="#confirmModal">Simpan</button>' +
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+

            // modal 

            '<div class="modal fade" id="confirmModal" tabindex="-1" role="dialog" aria-labelledby="confirmModal" aria-hidden="true">' + 
                '<div class="modal-dialog modal-sm modal-dialog-centered" role="document">' + 
                    '<div class="modal-content pln-modal">' + 
                        '<div class="pln-modal-header animated fadeIn delay-05s">' +
                            'Simpan data' +
                        '</div>'+  
                        '<div class="pln-modal-body animated fadeIn delay-1s">' +
                            'Pastikan data yang Anda isi sudah benar dan mudah untuk diingat.' +
                        '</div>'+
                        '<div class="pln-modal-footer animated fadeIn delay-15s">' +
                            '<button class="btn btn-light bg-transparent border-0  animated btn-sm fadeIn delay-2s" data-dismiss="modal" :disabled="loading">Kembali</button>' +
                            '<button class="btn btn-primary animated btn-sm fadeIn delay-2s" @click="saveAdmin" :disabled="loading">' +
                                '<div v-if="loading" class="spinner-border text-light" style="height: 1rem;width: 1rem;border-width: 0.1rem;"><span class="sr-only">Loading...</span></div>' +
                                '<span  v-else>Ya, lanjut!</span>' +
                            '</button>' +
                        '</div>'+
                    '</div>'+    
                '</div>'+    
            '</div>'+
            '<alert v-if="alert.show" @close="alert.show = false" :okclick="alert.okclick" :title="alert.title" :body="alert.body" ok="true" ></alert>'+
        '</div>'
});
Vue.component('alert',{
    props: {
        title       : {type: String, required: true}, 
        body        : {type: String, required: true}, 
        cancel      : {type: Boolean, default: false},
        cancelText  : String,
        ok          : {type: Boolean, default: false},
        okText      : String,
        okclose     : {type: Boolean, default: false},
        okclick     : {type: Function, default: function(){console.log('klik')}}
    },
    mounted(){
        setTimeout(function(){
            $('#alert .modal-backdrop').addClass('show')
        }, 300);
    },
    methods:{
        close(){
            let comp = this
            $('#alert .pln-modal').removeClass('delay-05s')
            $('#alert .pln-modal').addClass('bounceOut')
            setTimeout(function(){
                $('#alert .modal-backdrop').removeClass('show')
                setTimeout(function(){
                    comp.$emit('close');
                },600)
            }, 800);
        },
        okeclick(){
            if(this.okclose){
                let comp = this
                $('#alert .pln-modal').removeClass('delay-05s')
                $('#alert .pln-modal').addClass('bounceOut')
                setTimeout(function(){
                    $('#alert .modal-backdrop').removeClass('show')
                    setTimeout(function(){
                        comp.$emit('close');
                        comp.okclick();
                    },600)
                }, 800);
            } else {
                this.okclick();
            }
        }
    },
    template: 
        '<div id="alert" class="align-items-center d-flex justify-content-center vh-100">'+
            '<div class="container row" style="z-index:1050">'+
                '<div class="col-sm-4 m-auto">' + 
                    '<div class="modal-content pln-modal animated bounceIn delay-05s">' + 
                        '<div class="pln-modal-header animated fadeIn delay-1s">' +
                            '{{title}}' +
                        '</div>'+  
                        '<div class="pln-modal-body animated fadeIn delay-1s" v-html="body">' +
                        '</div>'+
                        '<div class="pln-modal-footer animated fadeIn delay-15s">' +
                            '<button v-if="cancel" class="btn btn-light bg-transparent border-0  animated btn-sm fadeIn delay-2s" @click="close">{{cancelText == null ? "Batal" : cancelText}}</button>' +
                            '<button v-if="ok" class="btn btn-primary animated btn-sm fadeIn delay-2s" @click="okeclick">{{okText == null ? "Ok" : okText}}</button>' +
                        '</div>'+
                    '</div>' +    
                '</div>' +    
            '</div>' +
            '<div class="modal-backdrop fade"></div>' +
        '</div>'
})
new Vue({
    el: '#el',
    data: {
        page: '',
        login: {
            id: '',
        }
    },
    methods: {
        init(){
            var comp = this
            feather.replace()
            $('[data-toggle="popover"]').popover(); 
            setTimeout(function(){comp.init()}, 500);
        },
        pageHandler(page){
            this.page = page
        }
    },
    mounted(){
        var comp = this
        setTimeout(function(){
            comp.init()
        }, 1000)
        setTimeout(function(){
            $.get({
                url: 'api/',
                success: function(v){
                    let data = JSON.parse(v);
                    if(data.status){
                        $.get({
                            url: 'api/',
                            data: {path:'auth'},
                            success(v){
                                let data = JSON.parse(v);
                                if(data.status){
                                    $('#loading').addClass('animate fadeOut')
                                    setTimeout(function(){
                                        comp.page = 'home'
                                        $('#loading').hide()
                                    }, 500)            
                                } else {
                                    $('#loading').addClass('animate fadeOut')
                                    setTimeout(function(){
                                        comp.page = 'login'
                                        $('#loading').hide()
                                    }, 500)            
                                }
                            }
                        })
                    } else if(data.message == 'new app'){
                        $('#loading').addClass('animate fadeOut')
                        setTimeout(function(){
                            comp.page = 'newapp'
                            $('#loading').hide()
                        }, 500)
                    }
                }
            });
        }, 1500);
    },
    template: 
    '<div>' +
        '<transition name="fade"><newapp @page="pageHandler" v-if="page == \'newapp\'"></newapp></transition>'+
        '<transition name="fade"><login @page="pageHandler" v-if="page == \'login\'"></login></transition>'+
        '<transition name="fade"><home @page="pageHandler" v-if="page == \'home\'"></home></transition>'+
    '</div>'
});