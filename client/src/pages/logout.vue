<script>
export default {
    created(){
       this.$store.dispatch('singOut', this.user);
       this.$router.push('/'); 
    }
}
</script>